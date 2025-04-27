'use client';

import Image from "next/image";

export default function EmergencyTypeSelector({ value, onChange }) {
  const emergencyTypes = [
    { name: 'Accident', icon: '/icons/accident.svg' },
    { name: 'Fire', icon: '/icons/fireService.svg' },
    { name: 'Medical', icon: '/icons/insurance-hand.svg' },
    { name: 'Robbery', icon: '/icons/robbery.svg' },
    { name: 'Police', icon: '/icons/police.svg' },
    { name: 'Other', icon: '/icons/other.svg' },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Select Emergency Type</h3>
      <hr />
      <div className="grid grid-cols-3 ">
        {emergencyTypes.map((type) => {
            const isSelected = value === type.name;
          return (
            <button
              key={type.name}
              onClick={() => onChange(type.name)}
              className={`flex flex-col items-center justify-center hover:cursor-pointer w-24 h-24 rounded-full p-1 transition-colors  ${
                isSelected
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <div className="relative w-9 h-9">
                {type.icon && (
                  <Image
                    src={type.icon}
                    alt={`${type.name} icon`}
                    width={48}
                    height={48}
                    className={`object-contain ${isSelected ? 'filter brightness-0 invert' : ''} `}
                  />
                )}
                {isSelected && (
                  <div className="absolute top-0 left-8 transform translate-x-1/2 -translate-y-1/2">
                    <svg
                      className="text-white bg-green-600 rounded-full p-1"
                      width="23"
                      height="23"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.2l-3.5-3.5a1 1 0 0 0-1.4 1.4l4.2 4.2a1 1 0 0 0 1.4 0l10-10a1 1 0 0 0-1.4-1.4L9 16.2z" />
                    </svg>
                  </div>
                )}
              </div>
              <span className="mt-2 text-lg hover:cursor-pointer">{type.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}