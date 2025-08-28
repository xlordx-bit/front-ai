// src/utils/messageFormatter.js

export const formatMessage = (content) => {
  // Clean up the content first
  const cleanContent = content.trim();
  
  // Split content into sections by double line breaks
  const sections = cleanContent.split(/\n\s*\n/);
  
  return sections.map((section, index) => {
    const trimmedSection = section.trim();
    if (!trimmedSection) return null;
    
    // Check for table format (contains | characters and multiple lines)
    if (trimmedSection.includes('|') && trimmedSection.split('\n').length >= 2) {
      return formatTable(trimmedSection, index);
    }
    
    // Check for pros/cons format (more flexible detection)
    if (/(?:^|\n)(pros?|advantages?|benefits?):/i.test(trimmedSection) || 
        /(?:^|\n)(cons?|disadvantages?|drawbacks?):/i.test(trimmedSection)) {
      return formatProsAndCons(trimmedSection, index);
    }
    
    // Check for numbered lists (more flexible)
    if (/^\d+\.|(?:\n|^)\d+\./m.test(trimmedSection)) {
      return formatNumberedList(trimmedSection, index);
    }
    
    // Check for bullet points (more flexible detection)
    if (/^[-*•]|(?:\n|^)[-*•]/m.test(trimmedSection)) {
      return formatBulletList(trimmedSection, index);
    }
    
    // Check for code blocks
    if (trimmedSection.includes('```') || /`[^`]+`/.test(trimmedSection)) {
      return formatCode(trimmedSection, index);
    }
    
    // Check for headers (lines ending with :)
    if (/^.+:$/m.test(trimmedSection) && trimmedSection.split('\n').length > 1) {
      return formatWithHeaders(trimmedSection, index);
    }
    
    // Default paragraph format
    return formatParagraph(trimmedSection, index);
  }).filter(Boolean);
};

const formatTable = (content, key) => {
  const lines = content.split('\n').filter(line => line.trim() && line.includes('|'));
  if (lines.length < 2) return formatParagraph(content, key);
  
  // Extract headers from first line
  const headerLine = lines[0];
  const headers = headerLine.split('|').map(h => h.trim()).filter(h => h);
  
  // Find separator line (contains --- or ===) or skip it
  let dataStartIndex = 1;
  if (lines[1] && (lines[1].includes('---') || lines[1].includes('==='))) {
    dataStartIndex = 2;
  }
  
  // Extract data rows
  const dataLines = lines.slice(dataStartIndex);
  const rows = dataLines.map(line => 
    line.split('|').map(cell => cell.trim()).filter(cell => cell)
  );

  return (
    <div key={key} className="overflow-x-auto my-4">
      <table className="w-full glass border border-neon-blue/30 rounded-xl overflow-hidden">
        <thead className="bg-gradient-to-r from-neon-blue/20 to-neon-purple/20">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-neon-blue border-b border-neon-blue/20">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-700/30 hover:bg-white/5 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-sm text-gray-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const formatNumberedList = (content, key) => {
  const lines = content.split('\n');
  const items = [];
  
  lines.forEach(line => {
    const trimmed = line.trim();
    if (/^\d+\./.test(trimmed)) {
      const cleanItem = trimmed.replace(/^\d+\.\s*/, '');
      if (cleanItem) items.push(cleanItem);
    }
  });
  
  if (items.length === 0) return formatParagraph(content, key);
  
  return (
    <div key={key} className="my-4">
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full flex items-center justify-center text-sm font-bold text-white">
              {i + 1}
            </span>
            <span className="text-gray-200 leading-relaxed pt-1">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

const formatBulletList = (content, key) => {
  const lines = content.split('\n');
  const items = [];
  
  lines.forEach(line => {
    const trimmed = line.trim();
    if (/^[-*•]/.test(trimmed)) {
      const cleanItem = trimmed.replace(/^[-*•]\s*/, '');
      if (cleanItem) items.push(cleanItem);
    }
  });
  
  if (items.length === 0) return formatParagraph(content, key);
  
  return (
    <div key={key} className="my-4">
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-2 h-2 bg-neon-blue rounded-full mt-2"></span>
            <span className="text-gray-200 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const formatProsAndCons = (content, key) => {
  const sections = content.split(/(?=(?:pros|advantages|cons|disadvantages):\s*)/i);
  
  return (
    <div key={key} className="my-4 space-y-4">
      {sections.map((section, i) => {
        if (!section.trim()) return null;
        
        const isPositive = /^(pros|advantages):/i.test(section.trim());
        const title = section.split(':')[0];
        const items = section.split(':')[1]?.split('\n').filter(item => item.trim()) || [];
        
        return (
          <div key={i} className={`glass border ${isPositive ? 'border-neon-green/30' : 'border-neon-pink/30'} rounded-xl p-4`}>
            <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isPositive ? 'text-neon-green' : 'text-neon-pink'}`}>
              <span className="text-lg">{isPositive ? '✅' : '❌'}</span>
              {title}
            </h4>
            <ul className="space-y-1">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-gray-200">
                  <span className={`w-1.5 h-1.5 rounded-full mt-2 ${isPositive ? 'bg-neon-green' : 'bg-neon-pink'}`}></span>
                  {item.trim()}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

const formatCode = (content, key) => {
  // Handle code blocks with ```
  if (content.includes('```')) {
    const parts = content.split('```');
    return (
      <div key={key} className="my-4">
        {parts.map((part, i) => {
          if (i % 2 === 1) { // Code block
            return (
              <div key={i} className="glass-dark border border-neon-purple/30 rounded-xl p-4 my-2 font-mono text-sm overflow-x-auto">
                <pre className="text-neon-green whitespace-pre-wrap">{part.trim()}</pre>
              </div>
            );
          } else if (part.trim()) { // Regular text
            return <p key={i} className="text-gray-200 leading-relaxed my-2">{part.trim()}</p>;
          }
          return null;
        })}
      </div>
    );
  }
  
  // Handle inline code with `
  const parts = content.split('`');
  return (
    <div key={key} className="my-4">
      <p className="text-gray-200 leading-relaxed">
        {parts.map((part, i) => 
          i % 2 === 1 ? (
            <code key={i} className="bg-neon-purple/20 text-neon-purple px-2 py-1 rounded font-mono text-sm">
              {part}
            </code>
          ) : (
            part
          )
        )}
      </p>
    </div>
  );
};

const formatParagraph = (content, key) => {
  if (!content.trim()) return null;
  
  return (
    <div key={key} className="my-4">
      <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{content.trim()}</p>
    </div>
  );
};
