import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network } from "lucide-react";
import { Label } from "@/components/ui/label";

const SubnetCalculator = () => {
  const [ipAddress, setIpAddress] = useState("192.168.1.0");
  const [cidr, setCidr] = useState("24");
  const [results, setResults] = useState<{
    networkAddress: string;
    broadcastAddress: string;
    subnetMask: string;
    wildcardMask: string;
    firstHost: string;
    lastHost: string;
    totalHosts: number;
    usableHosts: number;
    ipClass: string;
    binaryMask: string;
  } | null>(null);

  const ipToInt = (ip: string): number => {
    const parts = ip.split(".").map(Number);
    return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
  };

  const intToIp = (int: number): string => {
    return [
      (int >>> 24) & 255,
      (int >>> 16) & 255,
      (int >>> 8) & 255,
      int & 255,
    ].join(".");
  };

  const calculate = () => {
    const cidrNum = parseInt(cidr);
    if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) return;

    const ipParts = ipAddress.split(".");
    if (ipParts.length !== 4) return;
    if (ipParts.some((p) => isNaN(parseInt(p)) || parseInt(p) < 0 || parseInt(p) > 255)) return;

    const ipInt = ipToInt(ipAddress);
    const maskInt = cidrNum === 0 ? 0 : (~0 << (32 - cidrNum)) >>> 0;
    const wildcardInt = ~maskInt >>> 0;

    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | wildcardInt) >>> 0;

    const subnetMask = intToIp(maskInt);
    const wildcardMask = intToIp(wildcardInt);
    const networkAddress = intToIp(networkInt);
    const broadcastAddress = intToIp(broadcastInt);

    const totalHosts = Math.pow(2, 32 - cidrNum);
    const usableHosts = cidrNum >= 31 ? totalHosts : totalHosts - 2;

    const firstHost = cidrNum >= 31 ? networkAddress : intToIp(networkInt + 1);
    const lastHost = cidrNum >= 31 ? broadcastAddress : intToIp(broadcastInt - 1);

    // Determine IP class
    const firstOctet = parseInt(ipParts[0]);
    let ipClass: string;
    if (firstOctet < 128) ipClass = "A";
    else if (firstOctet < 192) ipClass = "B";
    else if (firstOctet < 224) ipClass = "C";
    else if (firstOctet < 240) ipClass = "D (Multicast)";
    else ipClass = "E (Reserved)";

    // Binary mask
    const binaryMask = maskInt.toString(2).padStart(32, "0").match(/.{8}/g)?.join(".") || "";

    setResults({
      networkAddress,
      broadcastAddress,
      subnetMask,
      wildcardMask,
      firstHost,
      lastHost,
      totalHosts,
      usableHosts,
      ipClass,
      binaryMask,
    });
  };

  return (
    <CalculatorLayout
      title="Subnet Calculator"
      description="Calculate IP subnets, network addresses, and CIDR notation"
      backLink="/tools"
      backLabel="Utility Tools"
      icon={<Network className="h-8 w-8 text-primary-foreground" />}
      category="Tools"
      canonicalPath="/tools/subnet"
      keywords={["ip subnet calculator", "cidr calculator", "network calculator"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>IP Address & CIDR</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>IP Address</Label>
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                placeholder="192.168.1.0"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <InputGroup
              label="CIDR Prefix"
              value={cidr}
              onChange={setCidr}
              placeholder="24"
              prefix="/"
              type="number"
            />
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Network Address"
            value={results ? results.networkAddress : "--"}
            highlight
          />
          <ResultCard
            label="Broadcast Address"
            value={results ? results.broadcastAddress : "--"}
          />
          <ResultCard
            label="Subnet Mask"
            value={results ? results.subnetMask : "--"}
          />
          <ResultCard
            label="Wildcard Mask"
            value={results ? results.wildcardMask : "--"}
          />
          <ResultCard
            label="Host Range"
            value={results ? `${results.firstHost} - ${results.lastHost}` : "--"}
          />
          <ResultCard
            label="Usable Hosts"
            value={results ? results.usableHosts.toLocaleString() : "--"}
          />
          <ResultCard
            label="IP Class"
            value={results ? results.ipClass : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default SubnetCalculator;
