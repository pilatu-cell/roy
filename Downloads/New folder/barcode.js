import bwipjs from 'bwip-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generateDLBarcode(dlData) {
    try {  
      // Validate data length (PDF417 has limitations)
      if (dlData.length > 1800) {
        throw new Error('Data too long for PDF417 barcode');
      }
  
      // Generate the barcode with optimized settings 
      const png = await bwipjs.toBuffer({
        bcid: 'pdf417',
        text: dlData,
        scale: 4,
        columns: 10,
        rows: 30,
        eclevel: 5,
        includetext: false,
        height: 19,
        width: 70, 
        paddingwidth: 1,
        paddingheight: 1,
        backgroundcolor: 'ffffff',
        rotate: 'N'
      });
  
      // Save with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `US-DL-${timestamp}.png`;
      const filePath = path.join(__dirname,'public/barcodes', filename);
      const image=fs.writeFileSync(filePath, png);
      
      console.log(`Successfully generated ${filename}`);
      return {
        downloadUrl: `/barcodes/${filename}`,
      };
    } catch (error) {
      console.error('Barcode generation failed:', error.message);
      throw error;
    }
  }
  