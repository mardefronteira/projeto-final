import PDFKit from 'pdfkit';
import fs from 'fs';


const generatePDF = ()=> {
    const pdf = new PDFKit();

    const pdf_Content = pdf.text('qr-code do produto');
    // pdf.image(`qrcodes/{_id}.png`, 300, 300);
    const pdf_file = pdf.pipe(fs.createWriteStream('pdf/qr-code.pdf'));
    pdf.end();
}

export default generatePDF;
