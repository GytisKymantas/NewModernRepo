import React from 'react';
import {
  createFileAcceptPatterns,
  extensionToMimeType,
  isValidFileExtension,
  isValidMimeType,
  parseAcceptTypes,
  validateFileAccept,
} from '../utils';

export function MimeTypeExample() {
  // Example usage of the new MIME type utilities
  const examples = {
    // File patterns
    imageAccept: createFileAcceptPatterns.images(),
    documentAccept: createFileAcceptPatterns.documents(),
    customAccept: createFileAcceptPatterns.custom(['.pdf', 'image/jpeg']),

    // Parse different accept formats
    stringParse: parseAcceptTypes('image/*,.pdf,.doc'),
    arrayParse: parseAcceptTypes(['image/jpeg', '.png', '.pdf']),
    mixedParse: parseAcceptTypes('image/jpeg,.pdf,video/mp4'),

    // Extension to MIME type conversion
    pdfMime: extensionToMimeType('.pdf'),
    jpgMime: extensionToMimeType('.jpg'),
    docMime: extensionToMimeType('.doc'),
    unknownMime: extensionToMimeType('.xyz'),

    // Validation
    validMime: isValidMimeType('image/jpeg'),
    invalidMime: isValidMimeType('invalid/type'),
    validExt: isValidFileExtension('.pdf'),
    invalidExt: isValidFileExtension('pdf'),
  };

  const handleFileValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isImageValid = validateFileAccept(file, 'image/*');
      const isPdfValid = validateFileAccept(file, '.pdf');

      console.log('File validation results:', {
        fileName: file.name,
        fileType: file.type,
        isImageValid,
        isPdfValid,
      });
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>MIME Type Utilities Demo</h2>

      <h3>File Accept Patterns</h3>
      <pre>{JSON.stringify(examples.imageAccept, null, 2)}</pre>
      <pre>{JSON.stringify(examples.documentAccept, null, 2)}</pre>

      <h3>Parse Accept Types</h3>
      <p>String: {JSON.stringify(examples.stringParse)}</p>
      <p>Array: {JSON.stringify(examples.arrayParse)}</p>
      <p>Mixed: {JSON.stringify(examples.mixedParse)}</p>

      <h3>Extension to MIME Type</h3>
      <p>.pdf → {examples.pdfMime}</p>
      <p>.jpg → {examples.jpgMime}</p>
      <p>.doc → {examples.docMime}</p>
      <p>.xyz → {examples.unknownMime || 'unknown'}</p>

      <h3>Validation</h3>
      <p>image/jpeg is valid: {examples.validMime.toString()}</p>
      <p>invalid/type is valid: {examples.invalidMime.toString()}</p>
      <p>.pdf is valid: {examples.validExt.toString()}</p>
      <p>pdf (no dot) is valid: {examples.invalidExt.toString()}</p>

      <h3>File Validation Test</h3>
      <input type='file' onChange={handleFileValidation} style={{ marginTop: '10px' }} />
      <p>Open browser console to see validation results</p>

      <h3>Libraries Used</h3>
      <ul>
        <li>
          <strong>mime</strong>: Industry standard MIME type detection (97M+ weekly
          downloads)
        </li>
        <li>
          <strong>attr-accept</strong>: HTML5-compliant file validation from
          react-dropzone team
        </li>
      </ul>
    </div>
  );
}

export default MimeTypeExample;
