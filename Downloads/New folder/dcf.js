import express from 'express';
import { Router } from 'express';

export function generateFakeDCF(stateCode) {
    // Simulate issuance date: YYMMDD
    const now = new Date();
    const issueDate = now.toISOString().slice(2, 10).replace(/-/g, ''); // e.g., "250707"

    // Simulate DMV office code (3 digits)
    const officeCode = Math.floor(Math.random() * 900 + 100); // e.g., 384

    // Simulate transaction/batch number (random alphanumeric)
    const rand = () =>
        Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);

    // Combine
    return `${officeCode}${stateCode}${issueDate}${rand()}`;
}

