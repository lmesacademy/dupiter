import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csv-data',
  templateUrl: './csv-data.component.html',
  styleUrls: ['./csv-data.component.css']
})
export class CsvDataComponent implements OnInit {
  CSV="text/csv";
  name="CSV duplicate remover";
  constructor() { }

  ConvertToCSV(objArray) {
    let row = '';
    let initialRow = "name,email,phone\r\n";
    row+=initialRow;
    Object.keys(objArray).forEach(email=>{
      let line = objArray[email].name+","+email+","+objArray[email].phone+"\r\n"
      row+=line
    })
    return row
   }



  public changeListener(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
       let file : File = files.item(0); 
       if( file.type != this.CSV){
          alert("please select valid csv file")
          return null
       }
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            let csv: string = reader.result as string;
            let rows = csv.split("\r\n");
            let result = {}
            rows.slice(1).forEach(row=>{
              let [name, email, phone] = row.split(",")
              if(name && email && phone){
                result[email] = {
                  name,
                  phone
                }
              }
            })
            console.log(Object.keys(result).length)
            let csvData = this.ConvertToCSV(result)
            let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
            let dwldLink = document.createElement("a");
            let url = URL.createObjectURL(blob);
            dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", "filename" + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
         }
      }
  }

  ngOnInit(): void {
  }


}
