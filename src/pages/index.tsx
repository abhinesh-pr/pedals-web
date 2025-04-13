

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-black dark:text-white"
      >
        <circle cx="5.5" cy="17.5" r="4.5" />
        <circle cx="18.5" cy="17.5" r="4.5" />
        <path d="M5.5 17.5L9 7h3l1 4h5" />
        <path d="M9 7L18.5 17.5" />
      </svg>
    </div>
  );
}

