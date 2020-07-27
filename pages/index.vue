<template>
  <div class="container">
    <input type="file" @change="changeListener($event.target.files)" />
    <input
      type="text"
      placeholder="Column name to be uniqued"
      @change="setName($event.target.value)"
    />
    <button :disabled="!isFile" @click="download()">Filter &amp; Download</button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

let file: any;

export default Vue.extend({
  data() {
    return {
      isFile: false,
      filter: "",
    };
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    changeListener(files: any) {
      console.log(files);
      if (files && files.length > 0) {
        file = files.item(0);
        if (file.type !== "text/csv") {
          this.isFile = false;
          alert("please select valid csv file");
          return null;
        } else {
          this.isFile = true;
        }
      }
    },
    setName(value: string) {
      this.filter = value;
      console.log(this.filter);
    },
    objToRow(rowObj: any, keys: any): string {
      let res = "";
      keys.forEach((element: any, i: Number) => {
        res += rowObj[element];
        if (i < keys.length - 1) {
          res += ",";
        }
      });
      return res + "\r\n";
    },

    convertToCSV(objArray: any, headers: any) {
      let row = "";
      const initialRow: any = headers.join();
      row += initialRow + "\r\n";

      Object.keys(objArray).forEach((key) => {
        if (key && key.length) {
          const line = this.objToRow(objArray[key], headers);
          row += line;
        }
      });
      return row;
    },

    download() {
      const reader: FileReader = new FileReader();
      const requiredFilter = this.filter;
      reader.readAsText(file);
      reader.onload = () => {
        const csv: string = reader.result as string;
        const rows = csv.split("\r\n");
        const result: any = {};
        const headers = rows[0].split(",").map((x) => String(x).trim());

        if (!headers.includes(requiredFilter)) {
          return alert("specified field not found in csv file");
        }

        rows.slice(1).forEach((row) => {
          const rowObject: any = {};

          row.split(",").forEach((element, i) => {
            rowObject[headers[i]] = element;
          });

          if (rowObject[requiredFilter]) {
            result[rowObject[requiredFilter]] = rowObject;
          }
        });
        console.log(Object.keys(result).length);
        const csvData = this.convertToCSV(result, headers);
        const blob = new Blob(["\uFEFF" + csvData], {
          type: "text/csv;charset=utf-8;",
        });
        const dwldLink = document.createElement("a");
        const url = URL.createObjectURL(blob);
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", "result" + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
      };
    },
  },
});
</script>

<style>
</style>
