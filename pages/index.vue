<template>
  <div class="container">
    <input type="file" @change="chooseFile($event)" />
    <select v-model="headerToClean">
      <option v-for="(h, index) in headers" :key="index" :value="h">{{ h }}</option>
    </select>
    <button @click="downloadCSV()">Download</button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

let file: any = "";
let objectStore: any = {};
let cleanData: any[] = [];

export default Vue.extend({
  data() {
    return {
      fileContent: "",
      headerToClean: "",
      data: [],
      headers: [] as any,
      csvOutput: "",
    };
  },
  mounted() {},
  methods: {
    chooseFile(event: any) {
      file = event.target.files[0];

      if (!file) {
        alert("Please choose a file");
        return true;
      }

      // Read the file content
      const reader: FileReader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        this.fileContent = reader.result as string;
        this.parseCSV(this.fileContent);
      };
    },
    // Parsing the CSV Headers and Data
    parseCSV(fileContent: string) {
      const lineArray = fileContent.split("\n");
      this.headers = lineArray[0].split(",") as [];
      const data: any = [];

      lineArray.splice(1).forEach((line) => {
        data.push(line.split(","));
      });
      this.data = data;
    },
    // Removing the duplicates in CSV File
    removeDuplicates() {
      const index = this.headers.indexOf(this.headerToClean);
      cleanData = [];
      objectStore = {};
      this.data.forEach((row) => {
        if (!objectStore[row[index]]) {
          objectStore[row[index]] = row;
          cleanData.push(row);
        }
      });
    },
    // Rebuilding the CSV File from Text Data
    buildCSVFile() {
      this.csvOutput = "";
      this.csvOutput = this.headers.join(",") + "\n";
      cleanData.forEach((row: any[]) => {
        this.csvOutput += row.join(",") + "\n";
      });
    },
    // Process and Download as CSV File
    downloadCSV() {
      this.removeDuplicates();
      this.buildCSVFile();
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/csv;charset=utf-8," + encodeURIComponent(this.csvOutput)
      );
      element.setAttribute("download", "output.csv");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
  },
});
</script>

<style>
</style>

