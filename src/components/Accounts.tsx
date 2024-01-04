"use client";

import React, { useState } from "react";

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";

import { type Account } from "~/lib/types";
import HealthFactor from "./HealthFactor";
import SimulatedHealthFactor from "./SimulatedHealthFactor";

export default function Accounts({ accounts }: { accounts: Account[] }) {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.address);

  const account = accounts.find(
    (account) => account.address === selectedAccount,
  );

  return (
    <>
      <div className="mb-6 text-center font-medium md:text-lg">
        <Select
          selectedKey={selectedAccount}
          onSelectionChange={(selected) =>
            setSelectedAccount(selected as string)
          }
          className="flex w-full flex-col items-center gap-1"
        >
          <Label className="cursor-default font-medium text-white md:text-lg">
            Account ({accounts.length})
          </Label>
          <Button className="pressed:bg-white flex w-full max-w-md cursor-default items-center rounded-lg border-0 bg-zinc-100 px-2 py-2 text-left text-base leading-normal text-gray-700 shadow-md transition focus:outline-none focus:ring-2 focus:ring-rose-600 focus-visible:ring-2">
            <SelectValue className="flex-1 truncate placeholder-shown:italic" />
            <ChevronUpDownIcon className="h-4 w-4 stroke-2" />
          </Button>
          <Popover className="entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out max-h-60 w-[--trigger-width] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5">
            <ListBox selectionMode="single" className="p-1 outline-none">
              {accounts.map((account) => (
                <ListBoxItem
                  key={account.address}
                  id={account.address}
                  textValue={account.address}
                  className="group flex cursor-default select-none items-center gap-2 rounded px-4 py-2 text-gray-900 outline-none focus:bg-rose-600 focus:text-white"
                >
                  {({ isSelected }) => (
                    <>
                      <span className="group-selected:font-medium flex flex-1 items-center gap-2 truncate font-normal">
                        {account.address}
                      </span>
                      <span className="flex w-5 items-center text-rose-600 group-focus:text-white">
                        {isSelected && (
                          <CheckIcon className="h-5 w-5 stroke-2" />
                        )}
                      </span>
                    </>
                  )}
                </ListBoxItem>
              ))}
            </ListBox>
          </Popover>
        </Select>
      </div>

      {/* {account && <HealthFactor account={account} />} */}

      {account && <SimulatedHealthFactor account={account} />}
    </>
  );
}
