"use client"

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from '@/utils/format';
import { useQuery } from "@tanstack/react-query"
import { Donation } from '@/generated/prisma';

interface ResponseData {
  data: Donation[]
}

export function DonationTable() {

  const { data, isLoading } = useQuery({
    queryKey: ['get-donates'],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_HOST_URL}/api/donates`;

      const response = await fetch(url);
      const json = await response.json() as ResponseData;

      if (!response.ok) {
        return [];
      }

      return json.data;
    },
    refetchInterval: 5000
  })

  if (isLoading) {
    return (
      <div className='mt-5'>
        <p className='text-center text=gray-700'>Carregando...</p>
      </div>
    )
  }

  return (
    <>
      {/* Versão para desktop */}
      <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-black">Nome do doador</TableHead>
              <TableHead className="font-semibold text-black">Mensagem</TableHead>
              <TableHead className="text-center font-semibold text-black">Valor</TableHead>
              <TableHead className="text-center font-semibold text-black">Data da doação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell className="font-medium">{donation.donorName}</TableCell>
                <TableCell className="max-w-72">{donation.donorMessage ?? <span className="italic text-muted-foreground">Sem mensagem</span>}</TableCell>
                <TableCell className="text-center">
                  {formatCurrency((donation.amount)/100)}
                </TableCell>
                <TableCell className="text-center">
                  {formatDate(donation.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Versão para mobile */}
      <div className="lg:hidden space-y-4">
        {data && data.map((donation) => (
          <Card key={donation.id}>
            <CardHeader>
              <CardTitle className="text-lg">{donation.donorName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {donation.donorMessage ?? <span className="italic">Sem mensagem</span>}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-green-500 font-semibold">
                  {formatCurrency(donation.amount / 100)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(donation.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

