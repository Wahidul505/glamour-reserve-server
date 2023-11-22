import { Booking } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import prisma from '../../shared/prisma';

const checkSlotAvailability = async (
  payload: Booking,
  updateId: string | null = null
) => {
  const alreadyBookedSlotOnDay = await prisma.booking.findMany({
    where: {
      date: payload?.date,
    },
  });

  const existingSlots = alreadyBookedSlotOnDay.map(slot => ({
    startTime: slot.startTime,
    endTime: slot.endTime,
    date: slot.date,
    id: slot.id,
  }));

  const newSlot = {
    startTime: payload?.startTime,
    endTime: payload?.endTime,
    date: payload?.date,
  };

  for (const slot of existingSlots) {
    const existingStart = new Date(`${slot.date}T${slot.startTime}:00`);
    const existingEnd = new Date(`${slot.date}T${slot.endTime}:00`);
    const newStart = new Date(`${newSlot.date}T${newSlot.startTime}:00`);
    const newEnd = new Date(`${newSlot.date}T${newSlot.endTime}:00`);

    if (newStart < existingEnd && newEnd > existingStart) {
      console.log('updateId', updateId);
      console.log('slotId', slot.id);
      if (updateId && slot.id === updateId) return;
      throw new ApiError(
        httpStatus.CONFLICT,
        'Slot already booked, Please try to book in another available slot'
      );
    }
  }
};

export const BookingUtils = {
  checkSlotAvailability,
};
