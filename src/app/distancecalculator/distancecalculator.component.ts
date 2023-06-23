import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-distancecalculator',
  templateUrl: './distancecalculator.component.html',
  styleUrls: ['./distancecalculator.component.css']
})
export class DistancecalculatorComponent {

  distanceForm: FormGroup;
  distance: any;
  excelData: any = [];
  downloadButton: boolean = true;
  selectedFile: File | undefined;
  selectedFileName: string | undefined;
  showRemove: boolean = false;
  isUploading: boolean = false;

  constructor(private formBuilder: FormBuilder, private toaster: ToastrService) {
    this.distanceForm = this.formBuilder.group({
      lat1: ['', Validators.required],
      long1: ['', Validators.required],
      lat2: ['', Validators.required],
      long2: ['', Validators.required],
      direction: ['', Validators.required]
    });
  }

  calculateDistance() {
    const lat1 = this.distanceForm.value.lat1;
    const long1 = this.distanceForm.value.long1;
    const lat2 = this.distanceForm.value.lat2;
    const long2 = this.distanceForm.value.long2;
    // const direction = this.distanceForm.value.direction;

    // Perform distance calculation based on the provided latitude, longitude, and direction

    // For example, you can use the Haversine formula to calculate the distance
    this.distance = this.haversineDistance(lat1, long1, lat2, long2);
  }

  haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Implementation of the Haversine formula to calculate distance
    // Replace this with your actual distance calculation logic
    // The example below calculates a mock distance

    const R = 6371; // Radius of the Earth in km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let distance = R * c;

    // Apply direction adjustment
    // if (direction === 'nw') {
    //   distance *= -1;
    // }

    return distance;
  }

  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile ? this.selectedFile.name : undefined;
    this.readExcelFile(file);
    if(file){
      this.downloadButton = false;
      this.showRemove = true;
      this.isUploading = true;
    }
    setTimeout(() => {
      this.toaster.success('File Uploaded Successfully')
      this.isUploading = false;
    }, 100);
  }


  readExcelFile(file: File) {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const arrayBuffer: any = e.target.result;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      this.excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      // Calculate distances and update the distance column
      for (let i = 1; i < this.excelData.length; i++) {
        const row = this.excelData[i];
        const lat1 = parseFloat(row[1]);
        const long1 = parseFloat(row[2]);
        const lat2 = parseFloat(row[3]);
        const long2 = parseFloat(row[4]);
  
        const distance = this.haversineDistance(lat1, long1, lat2, long2);
        row[5] = Math.round(distance * 100) / 100; // Round the distance value to 2 decimal places
        row.splice(6, 1); // Remove the direction column from the row
      }
    };
    fileReader.readAsArrayBuffer(file);
  }
  
  
  
  downloadExcel() {
    const worksheet = XLSX.utils.aoa_to_sheet(this.excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Calculated Distance');
    setTimeout(() => {
      this.toaster.success('File Downloaded Successfully')
    }, 100);
  }

  sampleDownload() {
  const filename = 'Sample.xlsx'; // replace with the name of your Excel file
  const filePath = '/assets/SampleBook3.xlsx'; // replace with the path to your Excel file
  const fileType = 'application/vnd.ms-excel'; // replace with the MIME type of your Excel file

  // initiate file download using FileSaver.js
  // FileSaver.saveAs(filePath, filename, { type: fileType });
  FileSaver.saveAs(filePath, filename, { type: fileType } as unknown as FileSaver.FileSaverOptions);
  setTimeout(() => {
    this.toaster.success('Sample-File Downloaded Successfully')
  }, 100);
  }


  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = URL.createObjectURL(data);
    a.download = fileName + '.xlsx';
    a.click();
  }

  Reset() {
    this.distanceForm.reset();
  }

  removeFile() {
    this.selectedFile = undefined;
    this.selectedFileName = undefined;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if(fileInput) {
      fileInput.value = '';
    }
    this.downloadButton = true;
    this.toaster.success('File Removed successfully');
  }

}

