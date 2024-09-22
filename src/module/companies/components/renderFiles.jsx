/* eslint-disable jsx-a11y/label-has-associated-control */
import { OnRun } from 'src/api/OnRun';
import { BsCloudUploadFill } from 'react-icons/bs';
import { handleFileRemove } from '../utils/removeUploadFiles';

export const renderFileSection = (fileKey, label, linkText, localData, setLocalData) => (
  <div className="mb-6">
    <label className="block text-right text-gray-700 text-sm font-medium ">{label}:</label>
    {typeof localData[fileKey] === 'string' ? (
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
        <a
          href={localData[`Lock_${fileKey}`] ? null : `${OnRun}/${localData[fileKey]}`}
          onClick={(e) => localData[`Lock_${fileKey}`] && e.preventDefault()}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm font-medium ${
            localData[`Lock_${fileKey}`] ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          {linkText}
        </a>
        <button
          type="button"
          className="text-red-400 hover:text-red-600 disabled:text-gray-200"
          onClick={() => handleFileRemove(fileKey, setLocalData)}
          disabled={localData[`Lock_${fileKey}`]}
        >
          حذف
        </button>
      </div>
    ) : (
      <div>
        <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100">
          <label className="flex   items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            انتخاب فایل
            <BsCloudUploadFill />
            <input
              id="file_input"
              name={fileKey}
              type="file"
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  [fileKey]: e.target.files[0],
                })
              }
              disabled={localData[`Lock_${fileKey}`]}
              className="hidden"
            />
          </label>
          <span className="ml-4 mr-8 text-sm">
            {localData[fileKey] ? localData[fileKey].name : 'هیچ فایلی انتخاب نشده'}
          </span>
        </div>
      </div>
    )}
  </div>
);
