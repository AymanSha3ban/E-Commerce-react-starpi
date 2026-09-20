import {
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  VStack,
} from "@chakra-ui/react"


export function ProductsSkeleton() {
  return (
    <Stack gap="6" maxW="xs">
      <HStack width="full">
        <SkeletonCircle size="10" />
        <SkeletonText noOfLines={2} />
      </HStack>
      <Skeleton height="200px" />
    </Stack>
  )
}
export function ProductDetailsSkeleton() {
  return (
    <Stack gap="6" maxW="full" p={6} border="1px solid" borderColor="gray.800" borderRadius="md">
      <VStack width="full">
        <Skeleton boxSize={200} width={'90%'}/>
        <SkeletonText noOfLines={2} />
      </VStack>
      <HStack width="full" justify="space-between">
         <SkeletonText noOfLines={1} width='100px' />
        <Skeleton height="50px" width='100px' />
      </HStack>
    </Stack>
  )
}
export function CategoriesSkeleton() {
  return (
    <Stack gap="6" maxW="xs">
      <HStack width="full">
        <SkeletonCircle size="10" />
        <SkeletonText noOfLines={2} />
      </HStack>
      <Skeleton height="200px" />
    </Stack>
  )
}
