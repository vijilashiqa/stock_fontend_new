import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder, } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfmake.vfs = pdfFonts.pdfMake.vfs;
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import htmltoPdfmake  from 'html-to-pdfmake'
import html2pdf from 'html2pdf.js';
import { tax } from '../../../../share/pipe/utils/index';
import { InvoiceService } from '../../../_services/invoice.service';
import { TaxPipe } from '../../../../share/pipe';

@Component({
  selector: 'ngx-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent {
  modalHeader: string; invdata; views; bus_address;count; data2; amount; tax; total; itemsgstt; itemigstt; itemcgst; itemgst; itemamt;taxsum2
  submit: boolean; cuser: any = []; data; receiptdata; rcptvalue; paystatus; username; invperiod; itemqty; total1;taxamount;taaa
  show_inv = 1; billsum;show;sum3;array :any=[];round;array2 :any=[];sumtax;totalsumtax1;sumtax1;sum1;taxsum;totalbill;totaltax

  @ViewChild('pdfTable') pdfTable: ElementRef;
  @ViewChild('content') content: ElementRef;

  public downloadAsPDF() {
    console.log('Download PDF')
    // const pdfTable = document.getElementById('pdfTable');
    // html2canvas(pdfTable).then((canvas) => {
    //   console.log('CANVAS', canvas)
    //   var imgData = canvas.toDataURL('image/png')
    //   var doc = new jsPDF();
    //   var imgHeight = canvas.height * 200 / canvas.width

    //   doc.addImage(imgData, 5, 15, 200, imgHeight)
    //   doc.save("image1.pdf")
    // });

    const pdfTable = document.getElementById('pdfTable');
    // html2canvas(pdfTable).then((canvas) => {

    //     var imgData = canvas.toDataURL('image/png')
    //     // var doc = new jsPDF();
    //     // var imgHeight = canvas.height * 200 / canvas.width
    //     var pdf = new jsPDF("p", "mm", "a4");
    //     var imgData = canvas.toDataURL('image/png', 1.0);
    //     // due to lack of documentation; try setting w/h based on unit
    //     pdf.addImage(imgData,17, 15, 170, 270);   // 180x150 mm @ (10,10)mm
    //     // doc.addImage(imgData, 0, 0, 200, imgHeight)
    //     pdf.save("Invoice.pdf")
    // });
    let nowdate = + new Date();
    let media = window.matchMedia('(max-width:600px)');

    console.log('Media', media.matches)
    if (media.matches) {
      let opt = {
        margin: [-0.05, 0.5, 0, 0.5],
        html2canvas: {
          scale: 2,
          // dpi: 192,
          letterRendering: true
        },
        filename: `${nowdate.toString().slice(0, 10)}.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        // html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      // New Promise-based usage:
      html2pdf().set(opt).from(pdfTable).save();
      // html2pdf().from(pdfTable).set(opt).toPdf().get('pdf').then(function (pdf) {
      //   $("p").css("font-size", "26px");
      //   }).save();

    } else {
      let opt = {
        margin: [0.25, 0.25, 0.25, 0.25],
        filename: `${nowdate.toString().slice(0, 10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },

        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // New Promise-based usage:
      html2pdf().set(opt).from(pdfTable).save();

      // Old monolithic-style usage:
      // html2pdf(pdfTable, opt);
    }

  }

  constructor(

    private invoice: InvoiceService,
    public activeModal: NgbActiveModal,
  
  ) { }

  async ngOnInit() {
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%", this.invdata)
    if (this.invdata) {
      await this.view();
    }
  }

  closeModal() {
    this.activeModal.close();
  }
  // generatePdf() {
  //   var dd = {
  //     content:
  //       document.getElementById('main_cont').innerHTML
  //   }

  //   const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  //   pdfmake.createPdf(dd).download();
  // }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('main_cont').innerHTML;
    popupWin = window.open();
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Tax Invoice</title>
          
          <style>
          @media print {
            @page { margin: 0; }
            body { margin: 1cm; }
          }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  async view() {
    let result = await this.invoice.getinvoice_edit({ id: this.invdata })
    this.data = result[0];
    console.log("common", this.data[0]);
    let result1 = await this.invoice.getinvoice_item_edit({ id: this.invdata })
    this.data2 = result1[0];
    // this.count=this.data2[1].cnt;
    console.log("split", this.data2);
    // console.log("data in the sgst",Number(this.data[0].sgst));
   const totalAmount = this.data2.reduce( (initial,final,i) => {
    console.log('value&&&&',final);
    
    if(i == 0) initial ={amt:0,tax:0}
    let tax_percentage = this.data[0].gsttype == 1 ? (this.data[0].igst ? this.data[0].igst : (Number(this.data[0].cgst)) +Number(this.data[0].sgst)):final.igst ? final.igst :(Number( final.cgst) + Number(final.sgst));
      const tot =  this.taxcal(Number(final.itemgst),Number(final.itemamt),Number(tax_percentage))
      initial.amt =(initial.amt + (final.itemqty * Number(tot['amt'])));
      initial.tax =(initial.tax +( final.itemqty  * Number(tot['taxamt'])));
      this.data2[i]['taxamt'] = ( final.itemqty  * Number(tot['taxamt']));
      console.log("ddd",this.data2[i]);

     return initial;

     
    },{})
    console.log('totalllll`lllll***********************',totalAmount  );
    this.taxsum = totalAmount.amt;
    this.taxsum2  = totalAmount.tax;
    this.round = this.taxsum2/2;
    this.totalbill = Number(this.taxsum) + Number(this.taxsum2)
  }



    taxcal(itemtaxtype, amount, taxper) {
   
    if (itemtaxtype == 0) {
      // Inclusive
      // let amt = (Number(amount) / ((100 + taxper) / 100));
      // let taxamt = (Number(amount) - Number(amt));
    let  taxamt = (amount * taxper) / (100 + taxper);
    let amt = Number(amount) - Number(taxamt)
      // console.log("Inclusive tax",taxamt);
      return { amt: amt.toFixed(2), taxamt: taxamt.toFixed(2) };
    } else {
      // Exclusive
      let amt = Number(amount);
      // let taxamt =Number ((Number(amount * taxper) / 100))
     let taxamt = (amount / 100) * taxper;
      // console.log("exclusive tax",taxamt);
      
      return { amt:amt.toFixed(2), taxamt:taxamt.toFixed(2)};
    }
  }


}






