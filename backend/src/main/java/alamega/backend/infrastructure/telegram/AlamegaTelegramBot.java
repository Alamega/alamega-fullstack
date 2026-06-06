package alamega.backend.infrastructure.telegram;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

import java.util.List;

@Slf4j
@Component
public class AlamegaTelegramBot extends TelegramLongPollingBot {
    @Value("${telegram.bot.username}")
    private String botUsername;

    @Value("${telegram.admin.chat.id}")
    private String adminChatID;

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    public AlamegaTelegramBot(@Value("${telegram.bot.token}") String botToken) {
        super(botToken);
    }

    @PostConstruct
    public void startBot() {
        try {
            if ("local".equals(activeProfile)) {
                log.info("Бот не запускается в локальном профиле.");
                return;
            }
            TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
            botsApi.registerBot(this);
            log.info("Телеграмовский ботик по кличке {} запустился!", botUsername);
        } catch (TelegramApiException e) {
            log.warn("Телеграмовский ботик не запустился: {}", e.getMessage());
        }
    }

    public void sendMessageToAdmin(String messageText) {
        try {
            sendMessage(adminChatID, messageText);
        } catch (TelegramApiException e) {
            log.warn("Не получилось отправить сообщение админу: {}", e.getMessage());
        }
    }

    public void sendMessage(String chatID, String messageText) throws TelegramApiException {
        SendMessage message = new SendMessage(chatID, messageText);
        execute(message);
    }

    public void sendMenu(String chatID) throws TelegramApiException {
        SendMessage message = new SendMessage(chatID, "Выберите действие:");
        InlineKeyboardMarkup markup = new InlineKeyboardMarkup();
        List<List<InlineKeyboardButton>> rows = List.of(
                List.of(InlineKeyboardButton.builder().text("📊 Статистика").callbackData("stats").build()),
                List.of(InlineKeyboardButton.builder().text("⚙️ Настройки").callbackData("settings").build())
        );
        markup.setKeyboard(rows);
        message.setReplyMarkup(markup);
        execute(message);
    }

    @Override
    public String getBotUsername() {
        return botUsername;
    }

    @Override
    public void onUpdateReceived(Update update) {
        try {
            if (update.hasMessage() && update.getMessage().hasText()) {
                String chatId = update.getMessage().getChatId().toString();
                String text = update.getMessage().getText();

                switch (text) {
                    case "/start" -> sendMenu(chatId);
                    case "/help" -> sendMessage(chatId, "Доступные команды:\n/start — меню\n/help — помощь");
                    default -> sendMessage(chatId, "Вы написали: " + text);
                }
            } else if (update.hasCallbackQuery()) {
                String chatId = update.getCallbackQuery().getMessage().getChatId().toString();
                String data = update.getCallbackQuery().getData();

                switch (data) {
                    case "stats" -> sendMessage(chatId, "📊 Статистика пока недоступна.");
                    case "settings" -> sendMessage(chatId, "⚙️ Настройки будут позже.");
                    default -> sendMessage(chatId, "Неизвестная команда.");
                }
            }
        } catch (TelegramApiException e) {
            log.error("Ошибка при обработке обновления", e);
        }
    }
}
