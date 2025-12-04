// components/purchase/purchase.component.ts
import { Component } from '@angular/core';
import { PdfGeneratorService, Ticket } from '../../services/pdf-generator.service';
import { NgIf, NgForOf } from "../../../../node_modules/@angular/common/index";

@Component({
  selector: 'app-purchase',
  standalone: true,
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  imports: []
})
export class PurchaseComponent {
  tickets: Ticket[] = [];
  qrCodes: { [key: string]: string } = {};

  constructor(private pdfService: PdfGeneratorService) { }

  async simulatePurchase(): Promise<void> {
    // Simulation d'achat de tickets
    this.tickets = [
      {
        id: 'TKT-' + Date.now() + '-1',
        eventName: 'Concert Rock',
        date: '15 Décembre 2025 - 20:00',
        location: 'Stade de Rabat',
        price: 45,
        buyerName: 'Malick Oumaima',
        seat: 'A12'
      },
      {
        id: 'TKT-' + Date.now() + '-2',
        eventName: 'Concert Rock',
        date: '15 Décembre 2025 - 20:00',
        location: 'Stade de Rabat',
        price: 60,
        buyerName: 'Moulaye Say',
        seat: 'A13'
      }
    ];

    // Générer les QR codes pour l'affichage HTML
    for (const ticket of this.tickets) {
      this.qrCodes[ticket.id] = await this.pdfService.generateQRCode(ticket.id);
    }
  }

  async downloadTicketsPDF(): Promise<void> {
    if (this.tickets.length === 0) {
      alert('Aucun ticket à télécharger');
      return;
    }

    try {
      await this.pdfService.generateTicketsPDF(this.tickets);
    } catch (error) {
      console.error('Erreur génération PDF:', error);
      alert('Erreur lors de la génération du PDF');
    }
  }

  // Méthode pour obtenir l'URL du QR code dans le template
  getQRCode(ticketId: string): string {
    return this.qrCodes[ticketId] || '';
  }
}