import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { 
  Type,
  Hash,
  Binary,
  Braces,
  List
} from 'lucide-react'

interface DataNodeProps {
  data: any;
  label?: string;
}

function DataNode({ data, label }: DataNodeProps) {
  const getDataType = (value: any): string => {
    if (Array.isArray(value)) return 'array';
    if (value === null) return 'null';
    return typeof value;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'string': return <Type className="h-4 w-4 text-blue-500" />;
      case 'number': return <Hash className="h-4 w-4 text-blue-500" />;
      case 'boolean': return <Binary className="h-4 w-4 text-blue-500" />;
      case 'object': return <Braces className="h-4 w-4 text-blue-500" />;
      case 'array': return <List className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  const renderValue = (value: any, type: string) => {
    if (value === null) return <span className="text-gray-500 dark:text-gray-400">null</span>;
    if (type === 'string') return <span className="text-blue-600 dark:text-blue-400">"{value}"</span>;
    if (type === 'number') return <span className="text-blue-600 dark:text-blue-400">{value}</span>;
    if (type === 'boolean') return <span className="text-blue-600 dark:text-blue-400">{value.toString()}</span>;
    return String(value);
  };

  const renderContent = () => {
    const type = getDataType(data);
    
    if (type === 'object' && data !== null) {
      return (
        <div className="space-y-3">
          {Object.entries(data).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="pl-4 border-l border-gray-200 dark:border-gray-700"
            >
              <DataNode data={value} label={key} />
            </motion.div>
          ))}
        </div>
      );
    }

    if (type === 'array') {
      return (
        <div className="space-y-3">
          {data.map((item: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="pl-4 border-l border-gray-200 dark:border-gray-700"
            >
              <DataNode data={item} label={`[${index}]`} />
            </motion.div>
          ))}
        </div>
      );
    }

    return (
      <div className="pl-4">
        {renderValue(data, type)}
      </div>
    );
  };

  const iconType = getDataType(data);
  const isExpandable = iconType === 'object' || iconType === 'array';

  return (
    <div className="rounded-lg">
      <div className="flex items-center space-x-2">
        {getTypeIcon(iconType)}
        {label && (
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {label}:
          </span>
        )}
        {!isExpandable && renderContent()}
      </div>
      {isExpandable && (
        <div className="mt-2">
          {renderContent()}
        </div>
      )}
    </div>
  );
}

export function Results({ 
  searchResults, 
}: { 
  searchResults: string | { result: any };
}) {
  let parsedData: any = null;
  
  try {
    parsedData = typeof searchResults === 'string' 
      ? JSON.parse(searchResults)
      : searchResults.result;
  } catch (e) {
    console.warn('Parse error:', e);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-red-600 dark:text-red-400">
              Failed to parse the search results. Raw data:
              <div className="mt-2 whitespace-pre-wrap font-mono text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                {typeof searchResults === 'string' 
                  ? searchResults 
                  : JSON.stringify(searchResults, null, 2)}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 h-full">
        <CardHeader className="border-b border-gray-100 dark:border-gray-700">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Investor Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <DataNode data={parsedData} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

