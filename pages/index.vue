<template>
  <div class="bg-gray-200 h-screen">
    <div class="container mx-auto">
      <div class="mx-32 px-10 py-8 text-center">
        <p class="text-center text-2xl text-black-100 font-bold">CSV Cleaner</p>
        <table class="bg-white text-center my-10 px-8 py-8 rounded overflow-hidden shadow-lg">
          <thead class="text-center">
            <tr>
              <th class="w-1/3 px-4 py-2">Upload</th>
              <th class="w-1/3 px-4 py-2">Choose Field</th>
              <th class="w-1/3 px-4 py-2">Download</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr>
              <td class="border px-4 py-2 text-center">
                <input type="file" @change="chooseFile($event)" />
              </td>
              <td class="border px-4 py-2 text-center">
                <select v-model="headerToClean" class="mx-6 px-10">
                  <option value default>Select Field</option>
                  <option v-for="(h, index) in headers" :key="index" :value="h">{{ h }}</option>
                </select>
              </td>
              <td class="border px-4 py-2 text-center">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-blue-100 py-2 px-4 rounded"
                  @click="downloadCSV()"
                >Download</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex flex-col text-center bg-white rounded shadow-lg">
          <div class="block w-full">
            <table class="text-center py-4 px-2 overflow-hidden">
              <thead class>
                <tr class="border-b-2">
                  <th
                    v-for="(h, index) in headers"
                    :key="index"
                    class="w-1/6 px-4 py-2 font-medium"
                  >{{ h }}</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="(row, rowIndex) in data" :key="rowIndex" class="border-b-2">
                  <td v-for="(d, dataIndex) in row" :key="dataIndex" class="px-4 py-2">{{ d }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

let file: any = "";
let objectStore: any = {};
let cleanData: any[] = [];

export default Vue.extend({
  middleware: "i18n",
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

