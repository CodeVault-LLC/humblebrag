import { Input } from "@src/components/ui/input";
import { Code, Eclipse, FileCode, Image, Key } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Files: React.FC = () => {
  const [files, setFiles] = useState<
    chrome.devtools.inspectedWindow.Resource[]
  >([]);
  const [filteredFiles, setFilteredFiles] = useState<
    chrome.devtools.inspectedWindow.Resource[]
  >([]);

  const [search, setSearch] = useState<string>("");

  useMemo(() => {
    // filter files based on search and filters.
    const filteredFiles = files.filter((file) => {
      if (search) {
        return file.url.includes(search);
      }

      return true;
    });

    setFilteredFiles(filteredFiles);
  }, [search]);

  useEffect(() => {
    chrome.devtools.inspectedWindow.getResources((resources) => {
      resources = resources.filter((resource) => {
        return !resource.url.startsWith("chrome-extension://");
      });

      setFiles(resources);
      setFilteredFiles(resources);
    });
  }, []);

  const getIcon = (url: string) => {
    // get javascript, css, html, svg and png icons.
    if (url.endsWith(".js")) {
      return <Code size={24} />;
    } else if (url.endsWith(".css")) {
      return <Eclipse size={24} />;
    } else if (url.endsWith(".html")) {
      return <FileCode size={24} />;
    } else {
      return <Image size={24} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex">
        <div className="flex-1 w-64 border-[#d8d8d8] dark:border-[#2c2c2e]  p-4">
          <div className="overflow-y-auto h-[94vh]">
            {filteredFiles.map((file) => (
              <div key={file.url} className="flex items-center mb-2 w-full">
                {getIcon(file.url)}
                <div className="ml-2 text-[#333] dark:text-[#f2f2f2] truncate w-48">
                  {file.url}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 w-full">
          <Input
            placeholder="Search files"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
