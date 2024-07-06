import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import { Slider } from "@src/components/ui/slider";

export const OptionsSidebar: React.FC = () => {
  return (
    <div className="w-64 border-l border-[#d8d8d8] dark:border-[#2c2c2e] bg-[#f2f2f2] dark:bg-[#1c1c1e] p-4">
      <div className="mb-4">
        <h3 className="text-[#333] dark:text-[#f2f2f2] font-medium">Themes</h3>
        <Select>
          <SelectTrigger className="w-full bg-[#e5e5e5] dark:bg-[#2c2c2e] text-[#333] dark:text-[#f2f2f2]">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="solarized">Solarized</SelectItem>
            <SelectItem value="monokai">Monokai</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <h3 className="text-[#333] dark:text-[#f2f2f2] font-medium">Font</h3>
        <Select>
          <SelectTrigger className="w-full bg-[#e5e5e5] dark:bg-[#2c2c2e] text-[#333] dark:text-[#f2f2f2]">
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="menlo">Menlo</SelectItem>
            <SelectItem value="source-code-pro">Source Code Pro</SelectItem>
            <SelectItem value="fira-code">Fira Code</SelectItem>
            <SelectItem value="roboto-mono">Roboto Mono</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <h3 className="text-[#333] dark:text-[#f2f2f2] font-medium">
          Text Size
        </h3>
        <Slider
          defaultValue={[14]}
          min={10}
          max={20}
          step={2}
          className="w-full"
        />
      </div>
    </div>
  );
};
