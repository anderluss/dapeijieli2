
import React, { useState, useRef } from 'react';
import { MarketingAsset } from '../types';

interface MarketingLabProps {
  onGenerated: (asset: MarketingAsset) => void;
}

const MarketingLab: React.FC<MarketingLabProps> = ({ onGenerated }) => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    if (!sourceImage || !projectName) return;
    onGenerated({
      id: Date.now().toString(),
      url: sourceImage,
      title: projectName,
    });
    // 重置
    setSourceImage(null);
    setProjectName("");
  };

  return (
    <div className="flex flex-col gap-6 p-8 glass rounded-[2.5rem] w-full max-w-md pointer-events-auto border-emerald-500/20">
      <div className="space-y-2 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
            <svg className="w-6 h-6 leaf-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
            作品管理
          </h2>
          <p className="text-xs text-emerald-600/40 mt-1 uppercase tracking-widest">Asset Management</p>
        </div>
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full aspect-square bg-emerald-50/50 border-2 border-dashed border-emerald-500/20 rounded-3xl flex items-center justify-center cursor-pointer overflow-hidden group relative hover:border-emerald-400/50 transition-all"
      >
        {sourceImage ? (
          <img src={sourceImage} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Source" />
        ) : (
          <div className="text-center p-6 space-y-2">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </div>
            <div className="text-emerald-800 font-medium">点击上传新作品</div>
            <div className="text-[10px] text-emerald-500/60 uppercase tracking-tighter">Support PNG, JPG up to 10MB</div>
          </div>
        )}
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept="image/*"
      />

      <div className="space-y-5">
        <div className="relative border-t border-emerald-500/10 pt-4">
          <div className="flex flex-col gap-3">
            <input 
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="输入作品名称..."
              className="w-full bg-white/50 border border-emerald-500/20 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500 text-emerald-950 placeholder:text-emerald-700/40"
            />
            <button 
              onClick={handleCreate}
              disabled={!sourceImage || !projectName}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-[11px] font-black uppercase transition-all disabled:opacity-30 active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              添加到展示列表
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingLab;
