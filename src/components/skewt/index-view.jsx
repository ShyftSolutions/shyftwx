import React, { Component } from 'react';
import './skewt-style.css';
import { calculateKIndex, calculateDCAPE, calculateTotalTotals, calculateIndices } from './index_calculator';

export class IndexView extends Component {
    render() {
        const indexData = [1, 2, 3, 4, 5, 6];
        const KIData = 7;
        const TTData = 8;
        const DCapeData = 9;
        if (this.props.data && this.props.data.length) {
            const KIData = calculateKIndex(this.props.data);
            const TTData = calculateTotalTotals(this.props.data);
            const indexData = calculateIndices(this.props.data);
            const DCapeData = calculateDCAPE(this.props.data);
            this.drawTextLabels(indexData, TTData, DCapeData, KIData);
        }

        return (
            <div>
                <table>
                    <tr>
                        <td>Lifted Index: </td>
                        <td>{parseFloat(indexData[3]).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>EL: </td>
                        <td>{parseFloat(indexData[5] * 3.3).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>LFC: </td>
                        <td>{parseFloat(indexData[4] * 3.3).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>LCL: </td>
                        <td>{parseFloat(indexData[2] * 3.3).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Lifted CAPE: </td>
                        <td>{parseFloat(indexData[0]).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>CINH: </td>
                        <td>{parseFloat(indexData[1]).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>TT: </td>
                        <td>{parseFloat(TTData).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>DCAPE: </td>
                        <td>{parseFloat(DCapeData).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>KI: </td>
                        <td>{parseFloat(KIData).toFixed(2)}</td>
                    </tr>
                </table>
            </div>
        );
    }
}
export default IndexView;
