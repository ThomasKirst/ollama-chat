import {motion} from "framer-motion";
import {cn} from "../lib/utils";
import {LoaderIcon, StopCircle} from "lucide-react";

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
  hasMessages: boolean;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onStop: () => void;
};

function ChatInput({
  hasMessages,
  inputRef,
  isLoading,
  onInputChange,
  onStop,
  value,
}: Props) {
  return (
    <motion.div
      animate={hasMessages ? {height: "auto"} : {}}
      className="relative h-full"
    >
      <motion.div
        className={cn("absolute flex items-center w-full", {
          "border-t": hasMessages,
        })}
        animate={hasMessages ? {} : {top: 0}}
      >
        <span className="hidden sm:flex w-6 mr-2" />
        <input
          ref={inputRef}
          disabled={isLoading}
          type="text"
          name="initial"
          autoCapitalize="off"
          autoComplete="off"
          placeholder="Start typing or upload a file..."
          className="mt-auto w-full text-lg sm:text-2xl pt-2 outline-none font-semibold disabled:opacity-50 disabled:bg-transparent"
          onChange={onInputChange}
          value={value}
        />
        {isLoading && (
          <>
            <div className="w-8 h-8 pt-2 text-gray-400">
              <LoaderIcon className="animate-spin" />
            </div>
            <div className="w-8 h-8 pt-2 text-gray-400" onClick={onStop}>
              <StopCircle className="text-gray-400" onClick={onStop} />
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default ChatInput;
