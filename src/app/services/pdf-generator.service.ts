// services/pdf-generator.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as QRCode from 'qrcode';

export interface Ticket {
  id: string;
  eventName: string;
  date: string;
  location: string;
  price: number;
  buyerName: string;
  seat?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  async generateTicketsPDF(tickets: Ticket[]): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < tickets.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      const ticket = tickets[i];
      await this.addTicketToPDF(pdf, ticket, pageWidth, pageHeight);
    }

    pdf.save(`tickets-${new Date().getTime()}.pdf`);
  }

  private async addTicketToPDF(pdf: jsPDF, ticket: Ticket, pageWidth: number, pageHeight: number): Promise<void> {
    // Générer le QR code
    const qrCodeDataUrl = await this.generateQRCode(ticket.id);

    // Ajouter le contenu du ticket
    pdf.setFontSize(20);
    pdf.setTextColor(0, 0, 128);
    pdf.text('VOTRE BILLET', pageWidth / 2, 20, { align: 'center' });

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);

    // Informations de l'événement
    pdf.text(`Événement: ${ticket.eventName}`, 20, 40);
    pdf.text(`Date: ${ticket.date}`, 20, 50);
    pdf.text(`Lieu: ${ticket.location}`, 20, 60);

    if (ticket.seat) {
      pdf.text(`Place: ${ticket.seat}`, 20, 70);
    }

    pdf.text(`Acheteur: ${ticket.buyerName}`, 20, 80);
    pdf.text(`Prix: ${ticket.price}Mad`, 20, 90);

    // Ajouter le QR code
    if (qrCodeDataUrl) {
      pdf.addImage(qrCodeDataUrl, 'PNG', pageWidth - 60, 40, 40, 40);
    }

    // Ligne de séparation
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, 110, pageWidth - 20, 110);

    // Informations importantes
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Présentez ce billet à l\'entrée avec le QR code', 20, 120);
    pdf.text('ID du billet: ' + ticket.id, 20, 130);
  }

  async generateQRCode(data: string): Promise<string> {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(data, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      return qrCodeDataUrl;
    } catch (error) {
      console.error('Erreur génération QR code:', error);
      return '';
    }
  }

  // Alternative: Génération à partir d'un template HTML (CORRIGÉE)
  async generatePDFFromHTML(elementId: string, filename: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Élément non trouvé');
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    // CORRECTION : Calcul correct des dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculer les dimensions de l'image pour qu'elle s'adapte à la page
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgHeight / imgWidth;

    let finalImgWidth = pdfWidth - 20; // Marge de 10mm de chaque côté
    let finalImgHeight = finalImgWidth * ratio;

    // Si l'image est trop haute, ajuster la hauteur
    if (finalImgHeight > pdfHeight - 20) {
      finalImgHeight = pdfHeight - 20;
      finalImgWidth = finalImgHeight / ratio;
    }

    // Centrer l'image sur la page
    const x = (pdfWidth - finalImgWidth) / 2;
    const y = (pdfHeight - finalImgHeight) / 2;

    pdf.addImage(imgData, 'PNG', x, y, finalImgWidth, finalImgHeight);
    pdf.save(filename);
  }

  // Version simplifiée pour générer directement le HTML en PDF
  async generatePDFFromHTMLSimplified(elementId: string, filename: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Élément non trouvé');
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Utiliser des dimensions fixes ou adapter selon le contenu
    const imgProps = {
      width: canvas.width,
      height: canvas.height
    };

    const ratio = imgProps.height / imgProps.width;
    const imgWidth = pdfWidth - 20; // Largeur avec marges
    const imgHeight = imgWidth * ratio;

    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(filename);
  }
}