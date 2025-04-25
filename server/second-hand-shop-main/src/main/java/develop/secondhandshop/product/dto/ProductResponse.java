package develop.secondhandshop.product.dto;

public record ProductResponse(
        Long userId,
        String username,
        Long productId,
        String productname,
        String content,
        int price
) {
}
