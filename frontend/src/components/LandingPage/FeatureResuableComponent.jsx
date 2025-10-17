import React from 'react'

const FeatureResuableComponent = ({ title, highlight, subtitle,
    gradientFrom = "from-purple-500", // default colors
    gradientTo = "to-green-500"
}) => {
    return (
        <div className='flex flex-col justify-center items-center my-16' >
            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold leading-tight">
                {title}{" "}
                <span
                    className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}
                >
                    {highlight}
                </span>
            </h1>

            {/* Subheading */}
            <p className="mt-3 sm:mt-4 lg:mt-6 text-sm sm:text-base lg:text-lg text-gray-600 text-center max-w-2xl">
                {subtitle}
            </p>
        </div>
    )
}

export default FeatureResuableComponent