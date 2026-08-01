"use client";

import Button from "@/components/ui/Button";
import { downloadCV } from "@/lib/utils";

const DownloadCVButton = () => (
  <Button variant="outline" onClick={downloadCV}>
    Download CV
  </Button>
);

export default DownloadCVButton;
