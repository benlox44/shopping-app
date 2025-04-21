import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    if (typeof Tawk_API === 'undefined') {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://embed.tawk.to/673286944304e3196ae067b5/1icelrd62';
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');

      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);

      script.onload = () => {
        console.log("Tawk.to cargado correctamente");
      };
    }
    
    return () => {
      const scriptTags = document.querySelectorAll('script[src="https://embed.tawk.to/673286944304e3196ae067b5/1icelrd62"]');
      scriptTags.forEach(tag => tag.remove());
    };
  }, []);

  return null; 
};

export default Chatbot;