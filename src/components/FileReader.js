import React from 'react';
import Papa from 'papaparse'

import './styles.css';

class FileReader extends React.Component {
    constructor() {
      super();
      this.state = {
        csvfile: undefined,
        gridData: [],
        buttonDisabled: true,
        gridHeaders: []
      };
      this.updateData = this.updateData.bind(this);
    }
  
    handleChange = event => {
      this.setState({
        csvfile: event.target.files[0],
        buttonDisabled: false
      });
    };
  
    importCSV = () => {
      const { csvfile } = this.state;
      Papa.parse(csvfile, {
        complete: this.updateData,
        header: true
      });
    };
  
    updateData(result) {
      var data = result.data;
      const gridData = Object.values(data).map((e, key) => Object.keys(e).map((el, key) => e[el].split(' ').join('')));
      const gridHeaders = result.meta.fields;

      this.setState({
      gridData,
      gridHeaders
    });
    }

    render() {
      const {buttonDisabled, gridHeaders, gridData} = this.state;

      return (
        <>
            <div className="fileUpload">
            <h2>Import CSV File!</h2>
            <input
                className="csv-input"
                type="file"
                ref={input => {
                this.filesInput = input;
                }}
                name="file"
                placeholder={null}
                onChange={this.handleChange}
            />
            <p />
            <button onClick={() => this.importCSV()} disabled={buttonDisabled}> Upload now!</button>
            </div>
            {!!gridData.length && <div className='csvTableWrapper'>
                <table>
                    <thead>
                        {/* If we want to get the headers from the CSV file and not be hard coded
                            <tr>
                            {gridHeaders.map((headerEl, inx) => <th key={inx}>{headerEl}</th>)}
                        </tr> */}
                       
                        <tr>
                            <th>
                                Employee ID #1
                            </th>
                            <th>
                                Employee ID #2
                            </th>
                            <th>
                                Project ID
                            </th>
                            <th>
                                Days worked
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {gridData.map((parsedData, index) => {debugger; return (
                        <tr key={index}>
                            {parsedData.map((tableEl, inx) => <td key={inx}>{tableEl}</td>)}
                        </tr>
                        );})}
                    </tbody>
                </table>
            </div>}
        </>
      );
    }
  }
  
  export default FileReader;
