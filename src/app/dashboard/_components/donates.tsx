"use client"

import React from 'react';
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
      <div className="space-y-4">
        {data && data.map((donation) => (
          <Card key={donation.id}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-blue-600 font-semibold">
                  {formatCurrency(donation.amount / 100)}
                </span> 
                - {donation.donorName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {donation.donorMessage ?? <span className="italic">Sem mensagem</span>}
              </p>
              <div className="flex justify-end items-center">
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

