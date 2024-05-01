export function Avatar({ name, classx }: { name: string, classx?: string}) {
    return (
      <span className={`bg-gray-300 rounded-full font-bold text-gray-600 text-sm ${classx} flex items-center justify-center`}>
        {name
          .split(" ")
          .map((word) => word.charAt(0))
          .join("")}
      </span>
)};  