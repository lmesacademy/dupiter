<template>
  <div>
    <div class="mx-32 my-8 px-10 py-8 text-center">
      <h1 class="text-center text-2xl text-purple-600 font-bold ">DUPITER</h1>
      <p class="text-center text-2xl text-black-100 font-bold ">Upload Files</p>
      <table class=" text-center mr-16 ml-24 my-10 px-8 py-8 ">
        <thead class="text-center">
          <tr>
            <th class="w-1/3 px-4 py-2">Upload</th>
            <th class="w-1/3 px-4 py-2">Categories</th>
            <th class="w-1/3 px-4 py-2">Download</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr>
            <td class="border  px-4 py-2 text-center"><input type="file" @change="chooseFile($event)" /></td>
            <td class="border px-4 py-2  text-center">
              <select v-model="headerToClean" class="mx-6 px-10">
                <option v-for="(h, index) in headers" :key="index" :value="h">{{ h }}</option>
              </select></td>
            <td class="border px-4 py-2 text-center">
              <button class="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded" @click="downloadCSV()">Download</button>
            </td>
          </tr>
        </tbody>
      </table>
      <table class=" text-center mr-16 ml-24 my-10 px-8 py-8 ">
        <thead class="text-center">
          <tr>
            <th class="w-1/6 px-4 py-2">Location</th>
            <th class="w-1/6 px-4 py-2">Name</th>
            <th class="w-1/6 px-4 py-2">Gender</th>
            <th class="w-1/6 px-4 py-2">Mail</th>
            <th class="w-1/6 px-4 py-2">Phone Number</th>
            <th class="w-1/3 px-4 py-2">Download</th>


          </tr>
        </thead>
        <tbody class="text-center">
          <tr>
            <td class="border  px-4 py-2 text-center"></td>
            <td class="border px-4 py-2  text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
          </tr>
          <tr>
            <td class="border  px-4 py-2 text-center"></td>
            <td class="border px-4 py-2  text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
          </tr>
          <tr>
            <td class="border  px-4 py-2 text-center"></td>
            <td class="border px-4 py-2  text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
          </tr>
          <tr>
            <td class="border  px-4 py-2 text-center"></td>
            <td class="border px-4 py-2  text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
            <td class="border px-4 py-2 text-center"></td>
          </tr>
        </tbody>
      </table>
    </div>

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

