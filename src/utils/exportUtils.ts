
import { saveAs } from 'file-saver';

export const exportProjectAsJson = (data: any): boolean => {
  try {
    // Convert project data to JSON string
    const jsonData = JSON.stringify(data, null, 2);
    
    // Create a blob from the JSON string
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // Generate a filename with current date and time
    const now = new Date();
    const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    const filename = `quiz_project_${timestamp}.json`;
    
    // Save the blob as a file
    saveAs(blob, filename);
    
    return true;
  } catch (error) {
    console.error('Error exporting project:', error);
    return false;
  }
};

export const importProjectFromJson = async (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (event.target?.result) {
          const jsonData = JSON.parse(event.target.result as string);
          resolve(jsonData);
        } else {
          reject(new Error('Failed to read file content'));
        }
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};
