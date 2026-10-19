import React from 'react';
import { CarouselSkill } from '../data/portfolioData';
import { Code2, Cpu, Database, Server, Sparkles, Terminal, Layers, Box } from 'lucide-react';

interface SkillCardProps {
  skill: CarouselSkill;
  isFront: boolean;
  angleFromFront: number; // in radians
  onClick: () => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  isFront,
  onClick,
}) => {
  // Select appropriate icon
  const getSkillIcon = (id: string) => {
    switch (id) {
      case 'react':
        return <Layers className="w-5 h-5 text-[#61DAFB]" />;
      case 'javascript':
        return <Code2 className="w-5 h-5 text-[#F7DF1E]" />;
      case 'nextjs':
        return <Server className="w-5 h-5 text-white" />;
      case 'nodejs':
        return <Terminal className="w-5 h-5 text-[#5FA04E]" />;
      case 'express':
        return <Server className="w-5 h-5 text-neutral-300" />;
      case 'mongodb':
        return <Database className="w-5 h-5 text-[#47A248]" />;
      case 'cpp':
        return <Cpu className="w-5 h-5 text-[#00599C]" />;
      case 'dsa':
        return <Code2 className="w-5 h-5 text-[#FF6B35]" />;
      case 'python':
        return <Terminal className="w-5 h-5 text-[#3776AB]" />;
      case 'numpy':
        return <Cpu className="w-5 h-5 text-[#4DABCF]" />;
      case 'pandas':
        return <Database className="w-5 h-5 text-[#E70488]" />;
      case 'threejs':
        return <Box className="w-5 h-5 text-[#FF7A45]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#FF6B35]" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`w-[250px] sm:w-[270px] h-[280px] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer select-none relative overflow-hidden backdrop-blur-xl ${
        isFront
          ? 'bg-[#121217]/95 border-2 border-[#FF6B35] shadow-[0_12px_36px_rgba(255,107,53,0.3)] ring-1 ring-[#FF6B35]/50'
          : 'bg-[#0e0e13]/85 border border-[#222228] hover:border-[#383844] shadow-xl'
      }`}
      style={{
        boxShadow: isFront
          ? '0 20px 40px -10px rgba(255, 107, 53, 0.35), 0 0 20px rgba(255, 107, 53, 0.2)'
          : '0 10px 25px -5px rgba(0, 0, 0, 0.6)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {/* Top subtle highlight reflection on front card */}
      {isFront && (
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent pointer-events-none" />
      )}

      {/* Card Header: Icon & Category Tag */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-11 h-11 rounded-xl bg-[#181820] border border-[#2a2a34] flex items-center justify-center shadow-inner"
            style={{
              borderColor: isFront ? `${skill.color}55` : '#2a2a34',
            }}
          >
            {getSkillIcon(skill.id)}
          </div>

          <span
            className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase text-neutral-400 bg-[#16161c] border border-[#24242c]"
          >
            {skill.category}
          </span>
        </div>

        {/* Skill Name */}
        <h3
          className={`text-xl font-display font-bold tracking-tight mb-2.5 transition-colors ${
            isFront ? 'text-white' : 'text-neutral-200'
          }`}
        >
          {skill.name}
        </h3>

        {/* Short, Concise Description (Max 12-15 words) */}
        <p className="text-xs text-neutral-400 font-light leading-relaxed">
          {skill.description}
        </p>
      </div>

      {/* Single Clean Tag / Accent Accent at Bottom */}
      <div className="pt-3 border-t border-[#1a1a22] flex items-center justify-between text-[11px] font-mono">
        <span className="text-neutral-500">{skill.badge || 'Verified'}</span>
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: skill.color || '#FF6B35' }}
        />
      </div>
    </div>
  );
};
export default SkillCard;
