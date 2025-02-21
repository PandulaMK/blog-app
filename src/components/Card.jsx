export default function Card({ title, description, date, stats = {}, tags = [] }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
  
        <div className="flex justify-between items-center text-gray-500 text-xs mt-3">
          <span>{date}</span>
          <div className="flex space-x-3">
            <span>👁 {stats.views || 0}</span>
            <span>💬 {stats.comments || 0}</span>
          </div>
        </div>
  
        {/* Ensure tags exist before mapping */}
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-xs px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
  