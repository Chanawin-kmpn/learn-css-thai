export const syntax = `.container {  
  display: grid;  
  grid-template-columns: repeat(3, 1fr);  
  grid-gap: 20px;  
}`;

export const cssCode = `.container {  
  display: grid;  
  grid-template-columns: repeat(3, 1fr);  
  gap: 20px;  
  padding: 1rem;  
}  

.item {  
  background: #fff;  
  padding: 1rem;  
  border-radius: 8px;  
}  

@media (max-width: 768px) {  
  .container {  
    grid-template-columns: 1fr;  
  }  
}  
`;
