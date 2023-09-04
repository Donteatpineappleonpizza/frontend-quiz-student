 import { URL_DATA } from "../utils/api";
 import { type Donation } from "@/utils/types";
import { Paper, Text, Stack, Group, Title, Card } from "@mantine/core";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Donation() {
  const [donations, setDonations] = useState<Donation[]>([]);

  return (
    <Card withBorder shadow="xs" bg="gray.3">
      <Group mb={20}>
        <Title order={1} color="gray">
          Total
        </Title>
        <Title order={1} variant="gradient">
          10000
        </Title>
        <Title order={1} color="gray">
          THB
        </Title>
      </Group>
      <Stack>
        <Paper shadow="xs" p="md">
          <Group>
            
          </Group>
        </Paper>
        <Paper shadow="xs" p="md">
        {donations.map((donation) => (
    <Group key={donation.id}>
       <Text>{donation.firstName}</Text>
              <Text>{donation.lastName}</Text>
              <Text>{donation.email}</Text>
              <Text>{donation.amount}</Text>
              <Text>{dayjs(donation.time).format("D-MMM HH:mm:ss")}</Text>
    </Group>
  ))}
        </Paper>

      </Stack>
    </Card>
  );
}
