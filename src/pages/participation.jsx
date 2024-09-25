import React from 'react';
import Partner from 'src/module/plan/feature/partner';
import Partnership from 'src/module/plan/feature/partnership';


const Participation = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-2 bg-gray-50 rounded-lg shadow-md">
          <Partner />
        </div>
        <div className="p-2 bg-gray-50 rounded-lg shadow-md">
          <Partnership />
        </div>
      </div>
    );
}

export default Participation;
