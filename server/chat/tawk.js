import { useEffect } from 'react';

export default function Tawk() {
    useEffect(() => {
        const Tawk_API = Tawk_API || {};
        const Tawk_LoadStart = new Date();

        (function() {
            const s1 = document.createElement('script');
            s1.async = true;

            s1.src = 'https://embed.tawk.to/67ab99333a842732607d5a48/1ijr4st71';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            const s0 = document.getElementsByTagName('script')[0];
            s0.parentNode.insertBefore(s1, s0);
        })();
    }, []);
    return null;
}
    
