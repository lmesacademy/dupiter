import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { type } from 'os';

@Component({
  selector: 'app-csv-data',
  templateUrl: './csv-data.component.html',
  styleUrls: ['./csv-data.component.css']
})
export class CsvDataComponent implements OnInit {
  CSV="text/csv";
  name="CSV duplicate remover";
  file=null
  isFile = false
  filter = ""
  constructor() { }

  objToRow(rowObj, keys){
    let res = ""
    keys.forEach((element, i) => {
      res+=rowObj[element]
      if(i<keys.length-1){
        res+=","
      }
    });
    return res+"\r\n"
  }

  ConvertToCSV(objArray, headers) {
    let row = '';
    let initialRow = headers.join()
    row+=initialRow+"\r\n";
    
    Object.keys(objArray).forEach(key=>{
      if(key && key.length){
        let line = this.objToRow(objArray[key], headers)
        row+=line
      }
    })
    return row
   }

   setName(value:string){
     this.filter =value
     console.log(this.filter)
   }


  public changeListener(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
       this.file = files.item(0); 
       if( this.file.type != this.CSV){
          this.isFile = false
          alert("please select valid csv file")
          return null
       }
       else{
         this.isFile = true
       }
      }
    }
    download(){
      let reader: FileReader = new FileReader();
      let requiredFilter = this.filter;
      reader.readAsText(this.file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        let rows = csv.split("\r\n");
        let result = {}
        let headers = rows[0].split(",").map(x => String(x).trim())
      if (!(headers.includes(requiredFilter))){
        return alert("specified field not found in csv file")
      }
        rows.slice(1).forEach(row=>{
          let rowObject = {}
          row.split(",").forEach((element,i)=>{
            rowObject[headers[i]] = element
          })

          if(rowObject[requiredFilter]){
            result[rowObject[requiredFilter]] = rowObject
          }
        })
        console.log(Object.keys(result).length)
        let csvData = this.ConvertToCSV(result, headers)
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", "result" + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }}

  ngOnInit(): void {
  }


}
