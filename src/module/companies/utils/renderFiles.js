import { OnRun } from "src/api/OnRun";
import {handleFileRemove} from "./removeUploadFiles"








export const renderFileSection = (fileKey, label, linkText, localData, setLocalData ) => (
    
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2">{label}:</label>
      {typeof localData[fileKey] === "string" ? (
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
          <a
            href={localData[`Lock_${fileKey}`] ? null : `${OnRun}/${localData[fileKey]}`}
            onClick={(e) => localData[`Lock_${fileKey}`] && e.preventDefault()}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium ${
              localData[`Lock_${fileKey}`] ? "text-gray-400" : "text-blue-600 hover:text-blue-800"
            }`}
          >
            {linkText}
          </a>
          <button
            type="button"
            className="text-red-400 hover:text-red-600 disabled:text-gray-200"
            onClick={() => handleFileRemove(fileKey)}
            disabled={localData[`Lock_${fileKey}`]}
          >
            حذف
          </button>
        </div>
      ) : (
        <input
          name={fileKey}
          type="file"
          onChange={(e) =>
            setLocalData({
              ...localData,
              [fileKey]: e.target.files[0],
            })
          }
          disabled={localData[`Lock_${fileKey}`]}
          className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      )}
    </div>
  );
  