import { Printer, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PrintButtonProps {
  title: string;
}

export const PrintButton = ({ title }: PrintButtonProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Use print dialog with "Save as PDF" option
    window.print();
  };

  const handleCopyResults = async () => {
    const resultsSection = document.querySelector('[data-results]');
    if (resultsSection) {
      const textContent = Array.from(resultsSection.querySelectorAll('[data-result-card]'))
        .map(card => {
          const label = card.querySelector('[data-result-label]')?.textContent || '';
          const value = card.querySelector('[data-result-value]')?.textContent || '';
          return `${label}: ${value}`;
        })
        .join('\n');
      
      const fullText = `${title}\n${'='.repeat(title.length)}\n\n${textContent}\n\nCalculated on ${new Date().toLocaleDateString()}`;
      
      try {
        await navigator.clipboard.writeText(fullText);
        // Could add toast notification here
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="print:hidden">
          <Printer className="h-4 w-4 mr-2" />
          Save / Print
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border border-border z-50">
        <DropdownMenuItem onClick={handlePrint} className="cursor-pointer">
          <Printer className="h-4 w-4 mr-2" />
          Print Results
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadPDF} className="cursor-pointer">
          <Download className="h-4 w-4 mr-2" />
          Save as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyResults} className="cursor-pointer">
          <Download className="h-4 w-4 mr-2" />
          Copy to Clipboard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
