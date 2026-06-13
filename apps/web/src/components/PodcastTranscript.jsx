import React from &rsquo;react&rsquo;;
import { Download, Clock } from &rsquo;lucide-react&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import { jsPDF } from &rsquo;jspdf&rsquo;;
import { toast } from &rsquo;sonner&rsquo;;

const transcriptData = [
  { time: &rdquo;00:00&rdquo;, text: &rdquo;Welcome to the show. Today we have Brandon Carter, founder of Scoopy Doo LLC.&rdquo; },
  { time: &rdquo;02:15&rdquo;, text: &rdquo;Brandon: Thank you for having me. Scoopy Doo started when my daughter Leighton and I realized there was a huge gap in the market for professional pet waste removal in Chattanooga.&rdquo; },
  { time: &rdquo;05:30&rdquo;, text: &rdquo;Host: What are the hidden health risks of leaving pet waste in the yard?&rdquo; },
  { time: &rdquo;06:00&rdquo;, text: &rdquo;Brandon: Many people don&rsquo;t realize that pet waste is not fertilizer. It&rsquo;s highly acidic, which is why it burns your lawn. More importantly, it carries harmful bacteria and parasites like E. coli, salmonella, and roundworms that can affect both pets and children playing in the yard.&rdquo; },
  { time: &rdquo;12:45&rdquo;, text: &rdquo;Host: What sets your professional service apart from DIY yard cleanup?&rdquo; },
  { time: &rdquo;13:10&rdquo;, text: &rdquo;Brandon: Consistency and sanitization. We use a meticulous grid-walking technique to ensure we never miss a spot. Plus, we sanitize all our equipment between properties to guarantee we aren&rsquo;t tracking any potential diseases from one yard to another.&rdquo; },
  { time: &rdquo;18:20&rdquo;, text: &rdquo;Host: It&rsquo;s incredible to see how a simple service can give families their weekends back. Thank you, Brandon.&rdquo; }
];

const PodcastTranscript = () => {
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text(&rdquo;Scoopy Doo LLC - Podcast Transcript&rdquo;, 20, 20);
      
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(&rdquo;Founder Brandon Carter on Pet Waste Management&rdquo;, 20, 30);
      
      doc.setFontSize(10);
      doc.setTextColor(0);
      
      let yPosition = 45;
      
      transcriptData.forEach((item) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFont(undefined, &rsquo;bold&rsquo;);
        doc.text(`[${item.time}]`, 20, yPosition);
        
        doc.setFont(undefined, &rsquo;normal&rsquo;);
        const splitText = doc.splitTextToSize(item.text, 160);
        doc.text(splitText, 35, yPosition);
        
        yPosition += (splitText.length * 6) + 4;
      });
      
      doc.save(&rdquo;Scoopy-Doo-Podcast-Transcript.pdf&rdquo;);
      toast.success(&rdquo;Transcript downloaded successfully.&rdquo;);
    } catch (error) {
      console.error(&rdquo;PDF generation failed:&rdquo;, error);
      toast.error(&rdquo;Failed to generate PDF. Please try again later.&rdquo;);
    }
  };

  return (
    <div className=&rdquo;bg-card rounded-2xl border border-border shadow-sm overflow-hidden&rdquo;>
      <div className=&rdquo;p-6 sm:p-8 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4&rdquo;>
        <div>
          <h3 className=&rdquo;text-2xl font-bold text-foreground&rdquo;>Episode Transcript</h3>
          <p className=&rdquo;text-muted-foreground mt-1&rdquo;>Detailed summary and key timestamps</p>
        </div>
        <Button onClick={handleDownloadPDF} variant=&rdquo;outline&rdquo; className=&rdquo;shrink-0 flex items-center&rdquo;>
          <Download className=&rdquo;w-4 h-4 mr-2&rdquo; />
          Download as PDF
        </Button>
      </div>
      
      <div className=&rdquo;p-6 sm:p-8 space-y-6&rdquo;>
        {transcriptData.map((item, index) => (
          <div key={index} className=&rdquo;flex gap-4 items-start group&rdquo;>
            <div className=&rdquo;shrink-0 flex items-center justify-center bg-muted text-muted-foreground font-mono text-xs px-2 py-1 rounded-md mt-1&rdquo;>
              <Clock className=&rdquo;w-3 h-3 mr-1&rdquo; />
              {item.time}
            </div>
            <p className=&rdquo;text-muted-foreground leading-relaxed&rdquo;>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastTranscript;