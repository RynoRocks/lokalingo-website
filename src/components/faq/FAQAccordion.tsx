'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-foreground pr-4 group-hover:text-accent transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-text leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

interface FAQCategory {
  title: string;
  items: Array<{ question: string; answer: string }>;
}

interface FAQAccordionProps {
  categories: FAQCategory[];
}

export function FAQAccordion({ categories }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'category-0-item-0': true,
  });

  const handleToggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      {categories.map((category, catIndex) => (
        <div key={catIndex} className="mb-12 last:mb-0">
          {category.title && <h2 className="text-h3 mb-6">{category.title}</h2>}
          <div className="bg-muted dark:bg-card rounded-2xl p-6 md:p-8">
            {category.items.map((item, itemIndex) => {
              const itemKey = `category-${catIndex}-item-${itemIndex}`;
              return (
                <FAQItem
                  key={itemKey}
                  question={item.question}
                  answer={item.answer}
                  isOpen={!!openItems[itemKey]}
                  onToggle={() => handleToggle(itemKey)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
