import React from "react";

export function BookList({ children }) {
    return (
        <table style={
            {
                width: '90%',
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "rgba(255,255,255,.5)"
            }
        }>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}

export function Item({ children }) {
    return (
        <tr>
            <td style={
                {
                    textAlign: "center"
                }
            }>
                {children}
            </td>
        </tr>
    )
}