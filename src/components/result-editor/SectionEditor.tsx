
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Section } from '@/types/resultPageConfig';
import ColorPicker from '../common/ColorPicker';
import { set, get } from 'lodash';

interface SectionEditorProps {
  section: Section;
  onSave: (section: Section) => void;
  onCancel: () => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ section, onSave, onCancel }) => {
  const [editedSection, setEditedSection] = useState<Section>({ ...section });
  const [activeTab, setActiveTab] = useState('content');

  const handleContentChange = (field: string, value: string | boolean | number) => {
    setEditedSection(prev => {
      const newSection = { ...prev };
      set(newSection, `content.${field}`, value);
      return newSection;
    });
  };

  const handleStyleChange = (field: string, value: string) => {
    setEditedSection(prev => {
      const newSection = { ...prev };
      set(newSection, `style.${field}`, value);
      return newSection;
    });
  };

  const handleSaveClick = () => {
    onSave(editedSection);
  };

  // Render form fields based on content structure
  const renderContentFields = () => {
    if (!editedSection.content) return null;
    
    return Object.entries(editedSection.content).map(([key, value]) => {
      // Skip rendering complex objects for now
      if (typeof value === 'object' && value !== null) {
        return (
          <div key={key} className="mb-4">
            <Label htmlFor={key} className="block text-sm font-medium mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </Label>
            <div className="text-sm text-gray-500 italic">
              Campo complexo (objeto ou array)
            </div>
          </div>
        );
      }
      
      if (typeof value === 'boolean') {
        return (
          <div key={key} className="flex items-center gap-2 mb-4">
            <Switch
              id={key}
              checked={value as boolean}
              onCheckedChange={(checked) => handleContentChange(key, checked)}
            />
            <Label htmlFor={key} className="capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </Label>
          </div>
        );
      }
      
      if (typeof value === 'string' && value.length > 100) {
        return (
          <div key={key} className="mb-4">
            <Label htmlFor={key} className="block text-sm font-medium mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </Label>
            <Textarea
              id={key}
              value={value as string}
              onChange={(e) => handleContentChange(key, e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
        );
      }
      
      return (
        <div key={key} className="mb-4">
          <Label htmlFor={key} className="block text-sm font-medium mb-1 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </Label>
          <Input
            id={key}
            type={typeof value === 'number' ? 'number' : 'text'}
            value={value as string | number}
            onChange={(e) => {
              const val = typeof value === 'number' ? Number(e.target.value) : e.target.value;
              handleContentChange(key, val);
            }}
            className="w-full p-2 border rounded"
          />
        </div>
      );
    });
  };
  
  // Render style fields
  const renderStyleFields = () => {
    if (!editedSection.style) return null;
    
    return (
      <div className="space-y-4">
        <div className="mb-4">
          <Label htmlFor="backgroundColor" className="block text-sm font-medium mb-1">
            Background Color
          </Label>
          <ColorPicker
            color={editedSection.style.backgroundColor || '#ffffff'}
            onChange={(color) => handleStyleChange('backgroundColor', color)}
          />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="textColor" className="block text-sm font-medium mb-1">
            Text Color
          </Label>
          <ColorPicker
            color={editedSection.style.textColor || '#000000'}
            onChange={(color) => handleStyleChange('textColor', color)}
          />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="padding" className="block text-sm font-medium mb-1">
            Padding
          </Label>
          <Input
            id="padding"
            type="text"
            value={editedSection.style.padding || ''}
            onChange={(e) => handleStyleChange('padding', e.target.value)}
            placeholder="40px 20px"
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="textAlign" className="block text-sm font-medium mb-1">
            Text Align
          </Label>
          <select
            id="textAlign"
            value={editedSection.style.textAlign || 'left'}
            onChange={(e) => handleStyleChange('textAlign', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="content" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="mt-4 space-y-4">
          <div className="flex items-center mb-4">
            <Switch
              id="visible"
              checked={editedSection.visible}
              onCheckedChange={(checked) => {
                setEditedSection(prev => ({ ...prev, visible: checked }));
              }}
            />
            <Label htmlFor="visible" className="ml-2">
              Show Section
            </Label>
          </div>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto p-2">
            {renderContentFields()}
          </div>
        </TabsContent>
        
        <TabsContent value="style" className="mt-4 max-h-[65vh] overflow-y-auto p-2">
          {renderStyleFields()}
        </TabsContent>
      </Tabs>
      
      <div className="mt-auto pt-4 flex justify-end gap-2 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSaveClick}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SectionEditor;
