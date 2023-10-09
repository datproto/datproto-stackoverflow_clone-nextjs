'use client'

import React from 'react'

import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'

interface IFilter {
  filters: {
    name: string
    value: string
  }[]
  customContainerClasses?: string
  customSelectClasses?: string
}

const FilterDropdown = ({
                          filters,
                          customContainerClasses,
                          customSelectClasses
                        }: IFilter) => {
  return (
    <div className={`relative ${customContainerClasses}`}>
      <Select>
        <SelectTrigger
          className={`${customSelectClasses} body-regular light-border text-dark500_light700 background-light800_dark300 border px-5 py-2.5`}>
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter"/>
          </div>

        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map(filter => (
              <SelectItem key={filter.value} value={filter.value}>{filter.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default FilterDropdown