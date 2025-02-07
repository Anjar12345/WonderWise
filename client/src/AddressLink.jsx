import PropTypes from 'prop-types';

export default function AddressLink({ children, className = '' }) {
    const defaultClassName = 'my-3 block flex gap-1 font-semibold underline justify-center items-center';
    const finalClassName = `${defaultClassName} ${className}`;

    return (
        <a
            className={finalClassName}
            target="_blank"
            rel="noopener noreferrer"  
            href={`https://maps.google.com/?q=${children}`}
            aria-label={`View location on Google Maps: ${children}`}  
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"  
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
            </svg>
            {children}
        </a>
    );
}


AddressLink.propTypes = {
    children: PropTypes.string.isRequired,  
    className: PropTypes.string,  
};
